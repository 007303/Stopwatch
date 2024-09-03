import { useState, useEffect, useRef } from "react";
import { Layout, Typography, Button, Space, Row, Col, Card, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  ReloadOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import moment from "moment";
import projectLogo from '../../assets/projectLogo.png';
import runningGif from '../../assets/running.gif';
import standingGif from '../../assets/standing.gif';
import './StopWatch.scss'; 

const { Header, Content } = Layout;
const { Title } = Typography;

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [stopDisplayTime, setStopDisplayTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const currentTimerValueRef = useRef();
  currentTimerValueRef.current = time;

  useEffect(() => {
    let interval;
    if (timerStatus === "start") {
      interval = setInterval(() => {
        let tempTime = currentTimerValueRef.current + 1000;
        currentTimerValueRef.current = tempTime;
        setTime(currentTimerValueRef.current);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus]);

  const formatTime = (seconds) => moment.utc(seconds).format("HH:mm:ss");

  const handleAction = (action) => {
    setTimerStatus(action);
    if (action === "stop") {
      setStopDisplayTime(time);
      setTime(0);
    } else if (action === "reset") {
      setStopDisplayTime(0);
      setTime(0);
    }
  };

  return (
    <div className="stopWatchContainer">
      <Layout className="layout">
        <Header className="header">
          <img src={projectLogo} className="projectLogo" alt="Project logo" />
        </Header>
        <Content className="content">
          <Row justify="center" align="middle" style={{ width: "100%" }}>
            <Col
              xs={24}
              sm={20}
              md={16}
              lg={12}
              xl={8}
            >
              <Card className="card">
                <Title level={2} className="cardTitle">Countdown to Launch</Title>
                <Title level={5} className="cardSubtitle">
                  Click on start button to start the Countdown
                </Title>
                <div className="timer">
                  <Title level={1} style={{ fontSize: "3rem", marginBottom: "2rem" }}>
                    {formatTime(currentTimerValueRef.current || stopDisplayTime)}
                  </Title>
                  {timerStatus === "start" ? <img src={runningGif} alt="Loading animation" className="animationGif" />
                   : <img src={standingGif} alt="Loading animation" className="animationGif" />}
                </div>
                <Space size="large" wrap>
                  {timerStatus === "pause" || currentTimerValueRef.current === 0 ? (
                    <Button
                      disabled={timerStatus === "stop" && stopDisplayTime !== 0}
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      size="large"
                      onClick={() => handleAction("start")}
                    >
                      Start
                    </Button>
                  ) : (
                    <Button
                      disabled={timerStatus === "stop" && stopDisplayTime !== 0}
                      type="primary"
                      icon={<PauseCircleOutlined />}
                      size="large"
                      onClick={() => handleAction("pause")}
                    >
                      Pause
                    </Button>
                  )}
                  <Button
                    type="danger"
                    icon={<StopOutlined />}
                    size="large"
                    onClick={() => handleAction("stop")}
                  >
                    Stop
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    size="large"
                    onClick={() => handleAction("reset")}
                  >
                    Reset
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
        <Tooltip
          title={
            <div>
              <p><strong>How the Stopwatch Works:</strong></p>
              <p><strong>Start/Pause:</strong> Click to start or pause the stopwatch. Click again to resume.</p>
              <p><strong>Stop:</strong> Stops the stopwatch and displays the final elapsed time on single click. Resets the timer to zero when double clicked.</p>
              <p><strong>Reset:</strong> Resets the stopwatch timer to zero.</p>
            </div>
          }
          placement="left"
          color="#333"
        >
          <Button
            type="primary"
            shape="circle"
            icon={<InfoCircleOutlined />}
            size="large"
            className="infoButton"
          />
        </Tooltip>
      </Layout>
    </div>
  );
};

export default StopWatch;
