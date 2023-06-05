import 'server-only'

export default function Card({ message }: { message: string }) {
    return (
        <>
            <div className="nes-container with-title is-centered">
                <p className="title">Container.is-centered</p>
                <p>{message}</p>
            </div>
        </>
    )
}