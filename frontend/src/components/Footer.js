import '../home.css'

function Footer(){
    return(
        <>
                  {/* Footer */}
      <div className="px-3 mx-1 my-3 footer">
        <footer className="row row-cols-5 py-4 mb-1 mt-5 border-top">
          <div className="col">
            <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
              <svg className="bi me-2" width="40" height="32"></svg>
            </a>
            <p className="text-muted">© 2024</p>
          </div>
          <div className="col"></div>
          <div className="col">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Home</a></li>
              <li className="nav-item mb-2"><a href="/about" className="nav-link p-0 text-muted">About</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Home</a></li>
              <li className="nav-item mb-2"><a href="/about" className="nav-link p-0 text-muted">About</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Home</a></li> 
              <li className="nav-item mb-2"><a href="/about" className="nav-link p-0 text-muted">About</a></li>
            </ul>
          </div>
        </footer>
      </div>

        </>
    )
}


export default Footer