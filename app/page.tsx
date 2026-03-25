import Image from "next/image";
import dbConnect from "@/lib/db.js";
import ContactForm from "@/components/contact-form.jsx";

export default async function Home() {

  await dbConnect();
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-bold mb-4">Server Actions Demo</h1>
          <p>Hello World</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
