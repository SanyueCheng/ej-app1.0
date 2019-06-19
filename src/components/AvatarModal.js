import React from 'react';
import { connect } from 'dva';
import { Modal, Toast } from 'antd-mobile';
import { Upload, Button, Icon } from 'antd'
import styles from './AvatarModal.css'
class AvatarModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: ''
        }
        this.upload_props = {
            name: 'formCollection',
            action: 'http://localhost:5000/api/File/upload',
            onChange: (info) => {
                if (info.file.status === 'done') {
                    let photo = info.file.response;
                    // this.setState({ imgUrl: 'http://localhost:5000/avatars/'+photo });
                    // this.props.form.setFieldsValue({
                    //     photo
                    // });
                    this.props.dispatch({
                        type: 'userModel/setPhoto',
                        payload:'http://10.84.130.41:5000/avatars/'+photo
                    });
                } else if (info.file.status === 'error') {
                    Toast.fail("上传失败")
                }
            },
        };
    }
    componentDidMount() {
        const { avatarUrl } = this.props;
        this.setState({ imgUrl: avatarUrl });
    }

    render() {
        const { visible, onCancel } = this.props;
        // this.imgUrl = avatarUrl;

        return (
            <Modal
                visible={visible}
                onClose={onCancel}
                transparent
                maskClosable={false}
                title="头像"
                footer={[{ text: '确定', onPress: () => { onCancel() } }]}
            >
                <div>
                    <img className={styles.img} src={this.props.userModel.photo} style={{ width: 100 }} alt="现有头像" />
                </div>
                <Upload {...this.upload_props}>
                    <Button>
                        <Icon type="upload" /> 更换头像
                    </Button>
                </Upload>,
            </Modal>
        );
    }

}

export default connect(({ userModel }) => ({ userModel }))(AvatarModal);