"use client";

import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ScrollArea } from "@/app/components/ui/Scrollarea";
import { Separator } from "@/app/components/ui/Separator";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Terms() {
    const [agreed, setAgreed] = useState(false);
  
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Terms & Conditions</h1>
        <Separator />
        <Card className="shadow-lg border rounded-lg overflow-hidden">
          <ScrollArea className="h-[400px] p-4">
            <CardContent className="space-y-4 text-gray-700 text-sm">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                Welcome to RentHub! By using our website and services, you agree to
                comply with the terms and conditions outlined below.
              </p>
              
              <h2 className="text-xl font-semibold">2. Rental Agreement</h2>
              <p>
                Users can rent gadgets and accessories for a specific period (weekly,
                monthly, or quarterly). The rental fee is charged accordingly.
              </p>
              
              <h2 className="text-xl font-semibold">3. Payment & Refund Policy</h2>
              <p>
                All payments must be made in advance. No refunds are issued once the
                rental period starts, except in cases of product malfunction.
              </p>
              
              <h2 className="text-xl font-semibold">4. User Responsibilities</h2>
              <p>
                Users must return the rented gadgets in the same condition as received.
                Any damages may result in additional charges.
              </p>
              
              <h2 className="text-xl font-semibold">5. Termination of Service</h2>
              <p>
                We reserve the right to terminate any rental agreement if terms are
                violated.
              </p>
            </CardContent>
          </ScrollArea>
        </Card>
        
        <div className="flex justify-between items-center">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5" />
            <span className="text-gray-700">I agree to the Terms & Conditions</span>
          </label>
          <Button disabled={!agreed} className={agreed ? "bg-blue-600" : "bg-gray-400"}>
            Continue
          </Button>
        </div>
        <button className="w-auto px-8 py-4 border-2 border-white text-white font-medium rounded-lg shadow-xl flex items-center justify-center space-x-2 transform hover:scale-105 hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out">
  <FaGithub /> <span>GitHub</span>
</button>


      </div>
    );
}
