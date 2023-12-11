import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="w-[100vw] min-h-[50vh]">
        <div className="flex flex-row mx-auto px-12 gap-x-4">
          <div className="w-1/2">
            <div className="p-8">
              <h1 className="mb-6 mt-6 text-3xl">How it works ?</h1>
              <ul>
                <li>
                  1. User Registration and Login / Sign Up: Users create an
                  account by providing personal details, such as name, email,
                  and password. Login: Users access the app by logging in with
                  their credentials.
                </li>
                <li>
                  2. Profile and Phone Number Setup Profile Completion: Users
                  complete their profile with additional details, including
                  their personal cell phone number. Twilio Phone Number
                  Allocation: The app allows users to select and allocate a
                  Twilio phone number. This number will be used for sending SMS
                  in emergencies.
                </li>
                <li>
                  3. Configuring Emergency Message Emergency Message Setup:
                  Users can set up or customize a predefined emergency message
                  in the app. This message is what will be read out during an
                  emergency call.
                </li>
                <li>
                  4. Sending an Emergency SMS Initiating Emergency Protocol: In
                  an emergency, the user sends an SMS to their allocated Twilio
                  number. App Receives SMS: The app, through Twilio&apos;s
                  services, receives the SMS.
                </li>
                <li>
                  5. Twilio Initiates a Call Call Trigger: Upon receiving the
                  SMS, Twilio triggers a call to the user&apos;s personal cell
                  phone number. Text-to-Speech Message: During the call, the
                  predefined emergency message is read out to the user using
                  Twilio&apos;s Text-to-Speech API.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-8">
              <ul>
                <li>
                  6. Additional Emergency Actions (Optional) Notify Emergency
                  Contacts: The app could be configured to simultaneously send
                  notifications or alerts to predefined emergency contacts.
                  Location Sharing: If enabled, the app might share the
                  user&apos;s location with emergency services or contacts.
                </li>
                <li>
                  7. User Responds or Acknowledges Acknowledgment of Safety: The
                  user may have the option to acknowledge the call or message,
                  indicating they are safe or need assistance. Further
                  Communication: The app might offer options for the user to
                  communicate directly with emergency services or contacts.
                </li>
                <li>
                  8. Post-Emergency Feedback Feedback Mechanism: After the
                  emergency, the user might be prompted to provide feedback on
                  the response and effectiveness of the service.
                </li>
                <li>
                  9. Account and Settings Management Updating Information: Users
                  can update their personal information, emergency message, and
                  phone number settings. Testing the Service: The app could
                  offer a feature to test the emergency call and message system
                  to ensure it works as expected.
                </li>
                <li>
                  10. Logging Out Secure Exit: Users log out of the app,
                  ensuring their information is kept secure.
                </li>
              </ul>
              <p>
                Important Considerations: Privacy and Security: Handling
                personal phone numbers and emergency messages requires careful
                attention to privacy and security. Reliability: Ensuring that
                the Twilio integration and emergency protocols are reliable and
                function as expected under different scenarios. User Consent and
                Legal Compliance: Clear user consent for automated calls and
                messages and adherence to telecommunications and privacy laws.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
