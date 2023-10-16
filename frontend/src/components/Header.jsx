import { Search } from './Search';
import './styles/header.css';

export const Header = () => {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-caption">
                                <h1 className="page-title">Hostales Jujeños</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-section">
                <div className="container">
                    <div className="card-block bg-white mb30">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="section-title mb-0">
                                    <Search />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
