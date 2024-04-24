export function DashboardHeader(props) {

    return (

        <>

            <nav class="navbar mt-2" style={{ backgroundColor: "#F7F2F6" }}>
                <div class="container">
                    <span class="navbar-brand mb-0 h1" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: "600" }}>
                        <span className={`bi ${props.icon} me-2`}></span>
                        {props.title}
                    </span>
                </div>
            </nav>

        </>

    )

}