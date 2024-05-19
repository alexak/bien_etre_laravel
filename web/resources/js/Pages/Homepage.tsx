
import MailConfirmationMessage from "@/Components/2_molecule/auth/MailConfirmationMessage";
import Auth from "@/Components/3_cell/Auth";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";


export default function Homepage()
{
  const [showMailConfirmationMessage, setShowMailConfirmationMessage] = useState(false);  
  useEffect(() => {
   // setShowMailConfirmationMessage();
  }, []);

  return (
    <div className="min-h-screen">
      < MailConfirmationMessage 
        isOpen={showMailConfirmationMessage}
        onClose={() => setShowMailConfirmationMessage(false)}
      />
      Hello world
      <Button onClick={()=>setShowMailConfirmationMessage(true)}>Sign In</Button>
    </div>
  );
};