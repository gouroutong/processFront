import * as React from 'react';
import { request } from '../utils/request';
import { Button, Card, Input, message, Radio, Steps } from 'antd';
import U from '../utils/U';
import LineLayout from '../components/Form/LineLayout';

import classNames from 'classnames';

const { Step } = Steps;
const components = {
    input: (props) => <Input {...props} />,
    textarea: (props) => <Input.TextArea {...props} />,
    phone: (props) => <Input {...props} />,
    radio: (props) => <Radio.Group {...props} />,
};
const FormRender = (props) => {
    const { list, onChange } = props;
    return (
        <>
            {list &&
                list.length > 0 &&
                list.map((item, index) => {
                    const { label, required, key } = item;
                    const renderForm = components[key];
                    const props = {
                        ...item,
                        onChange: (e) => onChange(U.getValueFromEvent(e), index),
                    };
                    return (
                        <LineLayout
                            key={index}
                            label={`${label}:`}
                            labelCls={classNames('label', { required })}
                        >
                            {renderForm && renderForm(props)}
                        </LineLayout>
                    );
                })}
        </>
    );
};
const ApplyEdit = (props) => {
    const { location, match } = props;
    const [steps, setSteps] = React.useState([]);
    const [current, setCurrent] = React.useState(0);
    const [processStep, setProcessStatus] = React.useState(0);
    const [formContent, setFormContent] = React.useState(null);
    const [applyForm, setApplyForm] = React.useState(null);
    const processId = parseInt(location.query.processId || 0);
    const id = parseInt(match.params.id || 0);

    const fetchProcess = () => {
        request('/process/item', { id: processId }).then((process) => {
            const { NodeList: steps } = process;
            setSteps(steps);
            getForm(0, steps);
        });
    };
    const fetchApply = () => {
        if (id > 0) {
            request('/apply/item', { id }).then((apply) => {
                const { Form } = apply;
                setProcessStatus((Form || []).length);
                setCurrent((Form || []).length);
                setApplyForm(Form);
            });
        }
    };
    React.useEffect(() => {
        fetchProcess();
        fetchApply();
    }, []);
    const getForm = (current, list = steps) => {
        const step = list[current];
        fetchForm(step.FormId);
    };

    const fetchForm = (formId) => {
        request('/form/item', { id: formId }).then((res) => {
            const { Content } = res;
            setFormContent(Content ? JSON.parse(Content) : []);
        });
    };
    const getStatus = (index) => {
        if (processStep > index) {
            return 'finish';
        }
        if (processStep < index) {
            return 'wait';
        }
        return 'process';
    };
    const changeContent = (value, index) => {
        const newContent = [...formContent.map((item) => ({ ...item }))];
        newContent[index].value = value;
        setFormContent(newContent);
    };
    const submit = (status) => {
        const data = {
            form: [
                {
                    content: JSON.stringify(
                        formContent.map(({ label, value }) => ({ label, value })),
                    ),
                },
            ],
            status,
        };
        if (id > 0) {
            data.id = id;
        }

        request('/apply/save', data).then((res) => {
            if (res) {
                message.info('success');
            }
        });
    };
    const renderFormContent = (content) => {
        content = JSON.parse(content);
        return (
            <>
                {content &&
                    content.length > 0 &&
                    content.map((item, index) => {
                        return (
                            <>
                                <div>{item.label}</div>
                                <div>{item.value}</div>
                            </>
                        );
                    })}
            </>
        );
    };
    return (
        <Card bordered={null} current={current}>
            {steps && steps.length > 0 && (
                <Steps
                    type="navigation"
                    onChange={(e) => {
                        setCurrent(U.getValueFromEvent(e));
                        getForm(U.getValueFromEvent(e));
                    }}
                    current={current}
                >
                    {steps.map((item, index) => {
                        const { Name, Id } = item;
                        return (
                            <Step
                                key={Id}
                                status={getStatus(index)}
                                title={Name}
                                disabled={index > processStep}
                            />
                        );
                    })}
                </Steps>
            )}
            {current == processStep && formContent && formContent.length > 0 && (
                <>
                    <FormRender key={current} list={formContent} onChange={changeContent} />
                    {steps && steps[current] && (
                        <div style={{ textAlign: 'center' }}>
                            {steps[current].Act == 'start' ? (
                                <Button onClick={submit}>发起</Button>
                            ) : (
                                <>
                                    <Button onClick={() => submit(1)}>审核通过</Button>
                                    <Button onClick={() => submit(2)}>驳回</Button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
            {current != processStep &&
                applyForm &&
                applyForm.length > 0 &&
                applyForm[current] &&
                applyForm[current].Content && (
                    <div>{renderFormContent(applyForm[current].Content)}</div>
                )}
        </Card>
    );
};

export default ApplyEdit;
