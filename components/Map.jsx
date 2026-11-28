export default function Map({
  address = "Arya Industry Ground Floor Plote AT Kh No-13. 18/1 And 8 G Near Cocacola Factory Najafgarh South West Delhi-110043",
  title = "Arya Industry location",
  zoom = 15,
  height = 450,
}) {
  const query = encodeURIComponent(address)
  const src = `https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d112073.81938414769!2d76.995915!3d28.620564!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM3JzE2LjIiTiA3NsKwNTknNDQuOCJF!5e0!3m2!1sen!2sus!4v1795436313387!5m2!1sen!2sus`
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="mx-auto w-[90%] py-12">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Find us</h2>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 underline-offset-4 transition hover:text-blue-700 hover:underline"
          >
            {address}
          </a>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Get directions
        </a>
      </div>

      <div className="w-full overflow-hidden rounded-3xl">
        <iframe
          title={title}
          src={src}
          width="100%"
          height={height}
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}