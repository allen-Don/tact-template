message 结构体 ，是否无法设置为字符串类型


import { SampleTactContract,Add,Subtract,Multiply, Divide } from "./output/sample_SampleTactContract";
contract_open.send(walletSender, {value: toNano("0.01")}, {
        $$type: 'Divide', amount: 2n
    } as Divide);

message 类型消息发送方式

2、可通过import 文件方式 ，导入想要的参数

3、需要通过散装消息的方式处理复杂业务逻辑，可设置消息回调通知