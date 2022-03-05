import './team.css'
import mahima from './mahima.jpg';
import cool from './cool.jpg';
import sir from './sir.jpg';
const Team = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12  py-5 ourTeam-hedding text-center">
                    <h1>Our Team</h1>
                    <p className="mt-3">These project was developed by the following three individuals, <strong> they did their best </strong> to make this full stack project a meaningful one.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="row section-success ourTeam-box text-center">
                        <div className="col-md-12 section1">
                            {/* <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg" /> */}
                            <img src={mahima} alt="mahima" />
                        </div>
                        <div className="col-md-12 section2 pb-3">
                            <p>MAHIMA CHOWDHURY</p>
                            <span>A very hardworking person, <br />Web Developer</span>
                        </div>
                        <div className="col-md-12 section3">
                            <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="row section-info ourTeam-box text-center">
                        <div className="col-md-12 section1">
                            {/* <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t1.jpg" /> */}
                            <img src={sir} alt="mahima" />
                        </div>
                        <div className="col-md-12 section2 pb-3">
                            <p>MD JEHADUL ISLAM MONY</p>
                            <span>The most dedicated person ever, period! <br />Project superviser</span>
                        </div>
                        <div className="col-md-12 section3">
                            <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="row section-danger ourTeam-box text-center">
                        <div className="col-md-12 section1">
                            {/* <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t3.jpg" /> */}
                            <img src={cool} alt="mahima" />
                        </div>
                        <div className="col-md-12 section2 pb-3">
                            <p>ISHAQUE AHMED</p>
                            <span>A constant learner, <br />Web Developer</span>
                        </div>
                        <div className="col-md-12 section3">
                            <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="/"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Team;