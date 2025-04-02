"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ScrollArea } from "@/app/components/ui/Scrollarea";
import { Separator } from "@/app/components/ui/Separator";
import { useState } from "react";

export default function PrivacyPolicy() {
    const [agreed, setAgreed] = useState(false);
  
    return (
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-white-700 mt-20">Privacy Policy</h1>
        <Separator />
        
        <Card className="shadow-xl border border-gray-300 rounded-lg overflow-hidden">
          <ScrollArea className="h-[500px] p-6">
            <CardContent className="space-y-6 text-gray-800 text-base">
              <section>
                <h2 className="text-2xl font-semibold text-blue-800">1. Introduction</h2>
                <p>
                  Welcome to RentHub! This Privacy Policy explains how we collect, use, and protect your personal data when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">2. Information We Collect</h2>
                <p>
                  We collect personal data such as your name, email address, payment information, and rental preferences when you use our platform. This information helps us provide a better service to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">3. How We Use Your Information</h2>
                <p>
                  The information we collect is used to process your rental transactions, communicate with you about your rentals, and improve our platform&apos;s functionality and user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">4. Data Protection</h2>
                <p>
                  We use various security measures to protect your personal data. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">5. Sharing Your Information</h2>
                <p>
                  We will not share your personal information with third parties except when required by law or when necessary to process your transactions. We may share data with trusted partners who help us run our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">6. Your Rights</h2>
                <p>
                  You have the right to access, modify, or delete your personal data. If you wish to exercise these rights, please contact us at support@renthun.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. When changes are made, the updated policy will be posted on this page with a new &quot;Last Updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-800">8. Contact Us</h2>
                <p>
                  If you have any questions regarding this Privacy Policy or our practices, please feel free to reach out to us at support@renthun.com.
                </p>
              </section>
            </CardContent>
          </ScrollArea>
        </Card>
        
        <div className="flex justify-between items-center mt-6">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5" />
            <span className="text-gray-700">I agree to the Privacy Policy</span>
          </label>
          <Button disabled={!agreed} className={agreed ? "bg-blue-700" : "bg-gray-400"}>
            Continue
          </Button>
        </div>
      </div>
    );
}
