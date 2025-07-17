import Header from '../component/Header'
import Footer from '../component/Footer'

function NotFound() {
  return (
    <>
      <Header />
      <div className='mainContainer'>
        <h4>404 not Found</h4>
        <p>ページが見つかりませんでしたTT</p>
      </div>
      <Footer />
    </>
  )
}

export default NotFound