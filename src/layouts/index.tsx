import { Link, Outlet, useLocation } from 'umi';
import './reset.less';
import styles from './index.less';
import stores from '@/store/index';
import { Provider } from 'mobx-react'
import CustomizedData from '../../CustomizedData.json';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export default function Layout() {

    const location = useLocation();

    if (location.pathname === '/404') {
        return (
            <ConfigProvider locale={zhCN}>
                <Outlet />
            </ConfigProvider>
        )
    }

    const containerStyle = {
        backgroundImage: `url(${CustomizedData.bg})`
        // backgroundImage: 'url(https://fastly.picsum.photos/id/518/1920/1080.jpg?hmac=yW2qvv7jVIo8fbpROaX6kzcR0ZBwogUgl0xsDRJWabA)'
    };

    return (
        <ConfigProvider locale={zhCN}>
            <div className={styles.layout} style={containerStyle} >
                <Provider {...stores}>
                    <Outlet />
                </Provider>
            </div>
        </ConfigProvider>
    );
}
