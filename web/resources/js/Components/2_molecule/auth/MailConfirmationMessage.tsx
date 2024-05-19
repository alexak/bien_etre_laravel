
import { Card, CardBody, Dialog } from "@material-tailwind/react";
import { useEffect, useState } from "react";


export default function MailConfirmationMessage({ isOpen, onClose }) {

    const [open, setOpen] = useState(isOpen);
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);
   
    const handleOpen = () => {
        if (open) {
            onClose(); // Close dialog and update parent's state
        }
        setOpen((cur) => !cur);
    };

    return (
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
                Coucou
            </CardBody>
          </Card>
        </Dialog>
    )
}