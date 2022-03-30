export default function({ store, redirect }) {
  if (!store.getters["user/getCurrentUser"]) {
    return redirect("/loginAdmin");
  }
}
