import { useState } from "react";
import { Slider, Typography, Button, InputNumber } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const FDCALculator = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(5);
  const compoundingFrequency = 4;

  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);

  const calculateFD = () => {
    const r = rate / 100;
    const n = compoundingFrequency;
    const t = tenure;
    const P = principal;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    setTotalInterest(interest);
    setMaturityAmount(A);
  };

  const chartData = {
    labels: ["Principal Amounts", "Total Interestss"],
    datasets: [
      {
        data: [principal, totalInterest],
        backgroundColor: ["#36a2eb", "#ff6384"],
        hoverBackgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  return (
    <div className="container">
      <div className="col-md-6 px-1 mt-5 calculator-container">
        <div
          style={{
            
            borderRadius: "10px",
            padding: "10px 40px",
          }}
        >
          <div style={{ marginBottom: "50px" }}>
            <Typography.Text
              style={{
                width: "20%",
                textAlign: "right",
                marginRight: "30px",
              }}
            >
              Principal Amount (₹):
            </Typography.Text>
            <InputNumber
              type="number"
              value={principal}
              onChange={(value) => setPrincipal(value ?? 0)}
              style={{ margin: "2px 0", width: "40%" }}
              placeholder="Enter principal amount"
            />
            <Slider
              value={principal}
              onChange={(value) => setPrincipal(value as number)}
              min={1000}
              max={1000000}
              step={5000}
              marks={{ 100000: "1,00,000", 500000: "5,00,000", 1000000: "10,00,000" }}
            />
          </div>

          <div style={{ marginBottom: "50px" }}>
            <Typography.Text
              style={{
                width: "20%",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              Rate of Interest (% p.a.):
            </Typography.Text>
            <InputNumber
              type="number"
              value={rate}
              onChange={(value) => setRate(value ?? 0)}
              style={{ margin: "2px 0", width: "40%" }}
              placeholder="Enter rate of interest"
            />
            <Slider
              value={rate}
              onChange={(value) => setRate(value as number)}
              min={0}
              max={20}
              step={0.1}
              marks={{ 0: "0%", 10: "10%", 20: "20%" }}
            />
          </div>

          <div style={{ marginBottom: "50px" }}>
            <Typography.Text
              style={{
                width: "20%",
                textAlign: "right",
                marginRight: "50px",
              }}
            >
              Time Period (Years):
            </Typography.Text>
            <InputNumber
              type="number"
              value={tenure}
              onChange={(value) => setTenure(value ?? 0)}
              style={{ margin: "2px 0", width: "40%" }}
              placeholder="Enter time period in years"
            />
            <Slider
              value={tenure}
              onChange={(value) => setTenure(value as number)}
              min={1}
              max={30}
              step={1}
              marks={{ 5: "5", 15: "15", 30: "30" }}
            />
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <Button
                type="primary"
                onClick={calculateFD}
                block
                style={{
                  backgroundColor: "#673ab7",
                  borderColor: "#673ab7",
                }}
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 px-1 mt-5 result-container">
        <div
          style={{
          
            minHeight: "80vh",
            borderRadius: "10px",
            padding: "10px 40px",
          }}
        >
          <div className="mt-1 d-flex justify-content-center">
            <h4>Results</h4>
          </div> 
          <div className="mt-1 d-flex align-items-center">
            <div className="col-4">Principal Amount</div>
            <div className="col-2 d-flex justify-content-center">:</div>
            <div className="col-4">₹{principal}</div>
          </div>
          <div className="mt-1 d-flex align-items-center">
            <div className="col-4">Total Interest</div>
            <div className="col-2 d-flex justify-content-center">:</div>
            <div className="col-4">₹{totalInterest.toFixed(2)}</div>
          </div>
          <div className="mt-1 d-flex align-items-center">
            <div className="col-4">Maturity Amount</div>
            <div className="col-2 d-flex justify-content-center">:</div>
            <div className="col-4">₹{maturityAmount.toFixed(2)}</div>
          </div>
          <div className="d-flex justify-content-center">
            <div style={{ width: "200px", height: "250px", marginTop: "5%" }}>
              <Doughnut
                data={chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCALculator;
