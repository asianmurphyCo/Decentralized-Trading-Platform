
function NotFound () {
    return (
        <div>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-5 mt-5">
              <div className="card login-bg">
                {/* DIRECT USER BACK TO LOGIN PAGE */}
                <h1 className="text-center mb-4 mt-4">Error 404 Page Not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default NotFound;