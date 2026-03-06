import RoomForm from "../room-form-bulk";
import { createRoomAction } from "@/lib/actions/hotel-manager/rooms";

export default function AddRoomPage() {
  return (
    <RoomForm onSubmit={createRoomAction} />
  );
}