"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

// Define the shape of the form state
export interface FormState {
  success: boolean;
  message: string;
}

// Define the validation schema using Zod
const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  state: z.string(),
  district: z.string().min(1, "Please select a district."),
  city: z.string().min(2, "City/Town is required."),
  language: z.string().min(1, "Please select a language."), // 1. ADDED language to validation
});

export async function signUpUser(prevState: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate the form data
  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0]?.message || "Invalid input." 
    };
  }
  
  // 2. DESTRUCTURED language from the validated data
  const { name, phone, password, state, district, city, language } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return { success: false, message: "A user with this phone number already exists." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        state,
        district,
        city,
        language, // 3. ADDED language to the data for Prisma
      },
    });
    
    // Return success message
    return { success: true, message: "Account created successfully! You can now sign in." };

  } catch (error) {
    console.error("SIGNUP_ERROR:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}