export const emailService = {
  async sendNewEnquiryEmail(enquiry) {
    // Placeholder for Resend integration later.
    return { success: true, enquiryId: enquiry.id }
  },

  async sendNewAppointmentEmail(appointment) {
    // Placeholder for Resend integration later.
    return { success: true, appointmentId: appointment.id }
  },

  async sendAppointmentStatusEmail(appointment) {
    // Placeholder for Resend integration later.
    return { success: true, appointmentId: appointment.id }
  },
}
