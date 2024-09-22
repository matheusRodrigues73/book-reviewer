export default function createId() {
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += `${Math.floor(Math.random() * 9)}`;
  }
  return id;
}
