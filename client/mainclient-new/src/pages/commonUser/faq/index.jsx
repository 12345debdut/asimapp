import React from 'react'
import './index.css'
import BaseLayout from '../../../component/shared/baseLayout';
import BottomNavBar from '../../../component/shared/bottomNavbar';

export default function FAQ(){
    return(

<React.Fragment>
<BaseLayout/>
<div className="faq-heading-div">
    <p className="faq-heading-text">FAQ SECTION</p>
</div>
<div className="container ">
    <div className="panel-group" id="faqAccordion">
        <div className="panel panel-default" style={{padding:5}}>
            <div className="faq-div"  
            data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                 <h4 className="panel-title">
                    <a href="#question0" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: How can I get admission to you?</a>
              </h4>

            </div>
            <div id="question0" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label-primary">Answer</span></h5>

                    <p className="faq-desc-single"> You make a call to Asim Roy Chowdhury @+91 9433255725, talk him about batch timings and join the batch as per telephonic conversation.
                        </p>
                </div>
            </div>
        </div>
        <div className="panel panel-default "  style={{padding:5}}>
            <div className="panel-heading accordion-toggle collapsed question-toggle faq-div" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                 <h4 className="panel-title">
                    <a href="#question1" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: Is there English medium tuition available?</a>
              </h4>

            </div>
            <div id="question1" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label label-primary">Answer</span></h5>

                    <p className="faq-desc-single">Yes it is. CBSE and ICSE both board's students can join</p>
                </div>
            </div>
        </div>
        <div className="panel panel-default "  style={{padding:5}}>
            <div className="panel-heading accordion-toggle collapsed question-toggle faq-div" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question2">
                 <h4 className="panel-title">
                    <a href="#question2" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: How much time a batch can carry on?</a>
              </h4>

            </div>
            <div id="question2" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label label-primary">Answer</span></h5>

                    <p className="faq-desc-single">It depends. However it may vary between 4-6 hours.</p>
                </div>
            </div>
        </div>
        <div className="panel panel-default "  style={{padding:5}}>
            <div className="panel-heading accordion-toggle collapsed question-toggle faq-div" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question3">
                 <h4 className="panel-title">
                    <a href="#question3" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: My child is specially abled student. Can he get admission there?</a>
              </h4>

            </div>
            <div id="question3" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label label-primary">Answer</span></h5>

                    <p className="faq-desc-single">Absolutely. He is just an ordinary student to us. We treat everyone equally here.</p>
                </div>
            </div>
        </div>
        
        <div className="panel panel-default "  style={{padding:5}}>
            <div className="panel-heading accordion-toggle collapsed question-toggle faq-div" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question4">
                 <h4 className="panel-title">
                    <a href="#question4" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: When will the monthly fees be collected?</a>
              </h4>

            </div>
            <div id="question4" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label label-primary">Answer</span></h5>

                    <p className="faq-desc-single">We take fees in advance at the start of the month. Fees amount will be instructed during your telephonic conversation.</p>
                </div>
            </div>
        </div>
        <div className="panel panel-default "  style={{padding:5}}>
            <div className="panel-heading accordion-toggle collapsed question-toggle faq-div" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question5">
                 <h4 className="panel-title">
                    <a href="#question5" className="ing faq-div-text" style={{textDecoration:"none"}}>Q: What are the payment modes accepted here?</a>
              </h4>

            </div>
            <div id="question5" className="panel-collapse collapse" style={{height:"0px",marginTop:10}}>
                <div className="panel-body">
                     <h5><span className="label label-primary">Answer</span></h5>

                    <p className="faq-desc-single">As of now, we have cash only option. But we are working on to bring more services to you.</p>
                </div>
            </div>
        </div>
    </div>
    <BottomNavBar/>
</div>
</React.Fragment>
    );
}