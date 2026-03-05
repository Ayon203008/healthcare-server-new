
enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface ICreateDoctorPayload {
    password: string
    doctor: {
        password: string
        name: string,
        email: string,
        profilePhoto: string,
        contactNumber: string,
        address: string,
        registrationNumber: string,
        expreience: number,
        gender: Gender,
        appointmentFee: string,
        qualification: string,
        currentWorkingPlace: string,
        designation: string
    }
    speacialties: string[]
}