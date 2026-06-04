function AttributeBox({ label, name, value }) {
  return (
    <article className="attribute-box">
      <span lang="pt">{label}</span>
      <strong>{value}</strong>
      <small>{name}</small>
    </article>
  );
}

export default AttributeBox;