
import './Page.css'

const Page = ({ title, actions, classes, children, color }) => {


    return (
        <div className={classes ? "page " + classes.join(' ') : "page"}>
            <h3 className='title'>{title}</h3>
            {actions && (
                <div className="actions">
                    {actions.map(action => (
                        <img className="icon" src={`../svgs/${action}-${color}.svg`} alt={action + "Icon"} key={action} />
                    ))}
                </div>
            )}
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Page