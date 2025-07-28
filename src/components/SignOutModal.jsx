import { Modal } from "antd";
import { useSignOutModal } from "../contexts/SignOutModalContext";

const SignOutModal = () => {
  const { isSignOutModalOpen, closeSignOutModal } = useSignOutModal();
  const signOut = () => {
    // Logic to handle sign out
    console.log("User signed out");
  };
  return (
      <Modal
        title="Đăng xuất"
        open={isSignOutModalOpen}
        onCancel={closeSignOutModal}
        onOk={() => {
          closeSignOutModal();
          signOut();
        }}
        okText="Đăng xuất"
        okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red', fontWeight: '600' } }}
        cancelText="Hủy"
        cancelButtonProps={{ style: { fontWeight: '600' } }}
      >
        <p>Bạn chắc chắn muốn đăng xuất?</p>
      </Modal>
  );
};

export default SignOutModal;