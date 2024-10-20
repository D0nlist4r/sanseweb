import PropTypes from 'prop-types';

export default function ContentDashboard(props) {
    return (
        <div className="hero bg-base-200 py-14">
            <div className="hero-content text-center">
                <div className="max-w-md">

                    <h1 className="text-5xl font-bold">Bienvenido, {props.name} </h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary mx-2 my-2">EMPEZAR AHORRO</button>
                    <button className="btn btn-secondary mx-2 my-2">SOLICITAR PRESTAMO</button>
                    <button className="btn btn-success mx-2 my-2">SERVICIO P2P</button>
                </div>
            </div>
        </div>
    )
}

ContentDashboard.propTypes = {
    name: PropTypes.string.isRequired,
};