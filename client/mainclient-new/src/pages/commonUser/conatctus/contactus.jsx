import React from 'react'
import BaseLayout from '../../../component/shared/baseLayout';
import './contactus.css'
import { Card,CardBody,Row,Col } from 'reactstrap';
import BottomNavBar from '../../../component/shared/bottomNavbar';

export default function ContactUs(){
    return(
        <div>
            <BaseLayout/>
            <div className="container contact">
	    <div className="row" style={{marginBottom:20}}>
		<div className="col-md-3">
			<div className="contact-info">
				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
				<h2>Contact Asim Roy Chowdhury</h2>
				<h4>We would love to hear from you !</h4>
			</div>
		</div>
		<div className="col-md-9">
			<Row>
			<Col>
			<Card style={{marginLeft:10,marginTop:10}}>
				<CardBody style={{display:"flex",flexDirection:"column"}}>
					<p>Asim Roy Chowdhury</p>
					<p>Contact: (+91)9433255725 (Whatsapp)</p>
					<p>Email: asim123abc@gmail.com</p>
				</CardBody>
			</Card>
			</Col>
			<Col>
			<Card style={{marginLeft:10,marginTop:10}}>
				<CardBody style={{display:"flex",flexDirection:"column"}}>
					<p>Piyali Sarkar</p>
					<p>Contact: (+91)9239525102 (Whatsapp)</p>
					<p>Email: asim123abc@gmail.com</p>
				</CardBody>
			</Card>
			</Col>
			</Row>
			<Row>
			
			<div className="col-lg-4 col-md-6 col-sm-12">
			<Card style={{marginLeft:10,marginTop:10}}>
				<CardBody style={{display:"flex",flexDirection:"column"}}>
					<div>
					<p>Kestopur</p>
					<p>Address-Line 1: AC 130 ,Ground 1, S.S.HEIGHT. PRAFULLA KANAN,EAST,KESTOPUR.Near kestopur-baishakhi footbridge.(at canal side road)</p>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.3924952931584!2d88.4215931149601!3d22.601813885167655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x26d82f558aa94a97!2sJagorani%20(NGO)!5e0!3m2!1sen!2sus!4v1587839902309!5m2!1sen!2sus" width="100%" height="100%" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
					</div>
				</CardBody>
			</Card>
			</div>
			<div className="col-lg-4 col-md-6 col-sm-12">
			<Card style={{marginLeft:10,marginTop:10}}>
				<CardBody>
					<div>
					<p>Bharat Tirtho School Near Kolkata Municipal Corporation Borough V</p>
					<p>Address-Line 2: 22, Surya Sen St, Lalbajar, Sealdah, College Street, Kolkata, West Bengal 700012</p>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1456656040987!2d88.36210201443403!3d22.57365463862193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027652e60c71b9%3A0xcf4d208b27c5857b!2sKolkata%20Municipal%20Corporation%20Borough%20V!5e0!3m2!1sen!2sin!4v1587840731058!5m2!1sen!2sin" width="100%" height="100%" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
					</div>
				</CardBody>
			</Card>
			</div>
			<div className="col-lg-4 col-md-6 col-sm-12">
			<Card style={{marginLeft:10,marginTop:10}}>
				<CardBody>
					<div>
					<p>Kasibose lane</p>
					</div>
				</CardBody>
			</Card>
			</div>
			</Row>
		</div>
	</div>
	<BottomNavBar/>
</div>
        </div>
    );
}