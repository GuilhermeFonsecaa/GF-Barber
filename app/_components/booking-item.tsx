import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const BookingItem = () => {
    return (
        <Card>
            <CardContent className="p-5 flex justify-between py-0">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D]">Confirmado</Badge>
                    <h2 className="font-bold">Corte de Cabelo</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h=6 w-6">
                            <AvatarImage src="https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png" alt="@shadcn" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">Vintage Barber</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-3">
                    <p className="text-sm">Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p className="text-sm">09:45</p>
                </div>
            </CardContent>
        </Card>


    );
}

export default BookingItem;