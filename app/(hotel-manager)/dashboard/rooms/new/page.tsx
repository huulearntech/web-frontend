import RoomForm from "../room-form-bulk";
import { createManyRoomsAction } from "@/lib/actions/hotel-manager/rooms";

export default function AddRoomPage() {
  return (
    <RoomForm onSubmit={createManyRoomsAction} />
  );
}