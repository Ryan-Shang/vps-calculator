import { useState, useEffect, useMemo } from 'react';
import useStore from '@/hooks/useStore';
import useRateData from '@/hooks/useRateData';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import CustomizedData from '../../../CustomizedData.json';
import CurrencyCode from '@/constants/CurrencyCode';
import DurationOptions from '@/constants/DurationOptions';
import dayjs from 'dayjs';


function CalculatorPage() {
    const { isLoading, setRateData } = useRateData();
    const { rateStore } = useStore();

    const currencyOptions = Object.keys(CurrencyCode).map(item => ({
        value: item,
        label: CurrencyCode[item as keyof typeof CurrencyCode]
    }))

    const [formInstance] = Form.useForm();
    const setCurrentRate = (currentCurrency: string) => {
        const currentRate = 1 / rateStore.rates[currentCurrency];
        formInstance.setFieldValue('rate', Math.round(currentRate * 100) / 100);
    };

    const handleSelectChange = (value: string) => {
        setCurrentRate(value);
    };

    const [isShowResult, setIsShowResult] = useState(false);
    const [remainValue, setRemainValue] = useState(0);
    const [overflowPrice, setOverflowPrice] = useState(0);

    const handleButtonClick = async () => {
        try {
            const res =  await formInstance.validateFields();
            const { renewDate, buyDate, renewal, duration, rate, amount } = res;
            const daysDiff = dayjs(renewDate).diff(dayjs(buyDate), 'day') + 1;
            const oneYearPrice = 12 / duration * renewal * rate;
            const tempRemainValue = daysDiff / 365 * oneYearPrice;
            setRemainValue(Math.round(tempRemainValue * 100) / 100);
            setOverflowPrice(Math.round((amount - tempRemainValue) * 100) / 100);
            setIsShowResult(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            await setRateData();
            const defaultCurrency = Object.keys(CurrencyCode)[0];
            setCurrentRate(defaultCurrency);
        })();
        document.title = CustomizedData.tabTitle || 'VPS剩余价值计算器';
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>VPS剩余价值计算器</h2>
            <ul className={styles.tips}>
                {((CustomizedData.tips as Array<string>).slice(0, 3) || []).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div className={styles.form}>
                <Form
                    form={formInstance}
                    name="basic"
                    labelAlign="left"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ width: 460 }}
                    initialValues={{
                        currency: currencyOptions[0].value,
                        duration: DurationOptions[3].value,
                        buyDate: dayjs()
                    }}
                >
                    <Form.Item
                        label="购机金额: "
                        name="amount"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <InputNumber style={{ width: 380 }} placeholder='默认CNY' />
                    </Form.Item>
                    <Form.Item
                        label="续费金额: "
                        name="renewal"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <InputNumber style={{ width: 380 }} />
                    </Form.Item>
                    <Form.Item
                        label="货币种类: "
                        name="currency"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <Select
                            style={{ width: 380 }}
                            onChange={handleSelectChange}
                            options={currencyOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        label="今日汇率: "
                        name="rate"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <InputNumber style={{ width: 380 }} />
                    </Form.Item>
                    <Form.Item
                        label="付款周期: "
                        name="duration"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <Select
                            style={{ width: 380 }}
                            options={DurationOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        label="购买日期: "
                        name="buyDate"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <DatePicker
                            style={{ width: 380 }}
                            format='YYYY-MM-DD'
                            placeholder='请选择日期'
                        />
                    </Form.Item>
                    <Form.Item
                        label="续费日期: "
                        name="renewDate"
                        rules={[{ required: true, message: '请补充该项内容！' }]}
                    >
                        <DatePicker
                            style={{ width: 380 }}
                            format='YYYY-MM-DD'
                            placeholder='请选择日期'
                        />
                    </Form.Item>
                </Form>
            </div>
            <Button
                className={styles.button}
                style={{ width: 460 }}
                type="primary"
                size="large"
                onClick={handleButtonClick}
            >
                计算
            </Button>
            {
                isShowResult &&
                    <div className={styles.result}>
                        <p>剩余价值: { remainValue }元</p>
                        <p>溢价金额: { overflowPrice }元</p>
                    </div>
            }
        </div>
    );
}

export default observer(CalculatorPage);
