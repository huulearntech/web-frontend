import RoomForm from "../room-form-bulk";
import { hotelowner_createManyRooms } from "@/lib/actions/hotel-manager/rooms";

export default function AddRoomPage() {
  return (
    <RoomForm onSubmit={hotelowner_createManyRooms} />
  );
}