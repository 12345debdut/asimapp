import React, { useEffect, useState } from "react";
import { PaymentInfoSingle } from "../../../firebase/common/payment/info";
import { Table } from "reactstrap";
import { useTheme } from "@mui/material";
export default function UserPaymentTab(props) {
  const [error, setError] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const theme = useTheme();
  useEffect(() => {
    fetch();
  }, [props.uid]);
  const fetch = async () => {
    const { uid } = props;
    if (uid) {
      let payment = await PaymentInfoSingle(uid);
      if (payment.status == 200) {
        let data = payment.data;
        setPaymentInfo(data);
      } else {
        setError(payment.message);
      }
    }
  };
  return (
    <div>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Month</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>April</td>
            <td>{paymentInfo && paymentInfo.april.amount}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>May</td>
            <td>{paymentInfo && paymentInfo.may.amount}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>June</td>
            <td>{paymentInfo && paymentInfo.jun.amount}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>July</td>
            <td>{paymentInfo && paymentInfo.july.amount}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>August</td>
            <td>{paymentInfo && paymentInfo.aug.amount}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>September</td>
            <td>{paymentInfo && paymentInfo.sept.amount}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>October</td>
            <td>{paymentInfo && paymentInfo.oct.amount}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>November</td>
            <td>{paymentInfo && paymentInfo.nov.amount}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>December</td>
            <td>{paymentInfo && paymentInfo.dec.amount}</td>
          </tr>
          <tr>
            <td>10</td>
            <td>January</td>
            <td>{paymentInfo && paymentInfo.jan.amount}</td>
          </tr>
          <tr>
            <td>11</td>
            <td>February</td>
            <td>{paymentInfo && paymentInfo.feb.amount}</td>
          </tr>
          <tr>
            <td>12</td>
            <td>March</td>
            <td>{paymentInfo && paymentInfo.march.amount}</td>
          </tr>
        </tbody>
      </Table>
      {error && (
        <p style={{ color: theme.palette.error.main, fontSize: 20 }}>{error}</p>
      )}
    </div>
  );
}
