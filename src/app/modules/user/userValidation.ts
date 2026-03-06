import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 chracter").max(20, "Must be less than 20 character"),
    doctor: z.object({
        name: z.string("Name is required").min(5, "Name must be at least 5 chracter").max(20, "Must be less than 20 character"),
        email: z.email("Invalid email address"),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 10 chracter").max(15, "Must be less than 14 character"),
        address: z.string("Address is required").min(5, "Address must be at least 5 chracter").max(100, "Must be less than 100 character"),
        experience: z.number("Experience is required").min(1, "Experience must be at least 1 year").max(50, "Must be less than 50 years"),
        registrationNumber: z.string("Registration number is required").min(5, "Registration number must be at least 5 chracter").max(20, "Must be less than 20 character"),
        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender is required"),
        appointmentFee: z.number("Appointment fee is required").min(1, "Appointment fee must be at least 1"),
        qualification: z.string("Qualification is required").min(5, "Qualification must be at least 5 chracter").max(100, "Must be less than 100 character"),
        currentWorkingPlace: z.string("Current working place is required").min(5, "Current working place must be at least 5 chracter").max(100, "Must be less than 100 character"),
        designation: z.string("Designation is required").min(5, "Designation must be at least 5 chracter").max(100, "Must be less than 100 character"),
    }),
    specialties: z.array(z.uuid(), "Specialties is required").min(1, "Specialties must be at least 1")

})