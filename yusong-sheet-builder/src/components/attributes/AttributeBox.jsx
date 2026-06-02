function AttributeBox({ label, name, value }) {
  return (
    <article className="attribute-box">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{name}</small>
    </article>
  );
}

export default AttributeBox;