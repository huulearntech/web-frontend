import { Modal } from "antd";

const SignOutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      title="Đăng xuất"
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
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