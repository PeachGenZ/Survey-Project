import React from 'react';

const Header = () => {
    return (
        <div className="container-fullwidth">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#"><h4>SurveyJS</h4></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#"><h5>หน้าหลัก</h5> <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link active" href="#"><h5>ฟีเจอร์</h5> <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link active" href="#"><h5>วิเคราะห์ผล</h5> <span className="sr-only">(current)</span></a>
                    {/* <a class="nav-item nav-link" href="#">ฟีเจอร์</a>
                        <a class="nav-item nav-link" href="#">Pricing</a>
                        <a class="nav-item nav-link disabled" href="#">Disabled</a> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;