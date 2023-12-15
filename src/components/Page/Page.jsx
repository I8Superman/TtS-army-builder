
import './Page.css'

// Icons:
// import eyeDarkPurple from '@/assets/svgs/eye-dark-purple.svg'
// import copyDarkPurple from '@/assets/svgs/copy-dark-purple.svg'
// import printDarkPurple from '@/assets/svgs/printer-dark-purple.svg'

const Page = ({ title, actions, classes, children, color }) => {

    console.log(color, actions)

    return (
        <div className={classes ? "page " + classes.join(' ') : "page"}>
            <h3 className='title'>Create {title} Army List</h3>
            {actions && (
                <div className="actions">
                    {actions.map(action => (
                        <img className="icon" src={`./svgs/${action}-${color}.svg`} alt={action + "Icon"} key={action} />
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