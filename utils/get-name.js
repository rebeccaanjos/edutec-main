export async function getName() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado!");
        return;
    }

    const response = await fetch("http://localhost:3000/getname", {
        headers: {
            "Authorization": token,
        },
    }).then((response) => response.json());

    return response.name
}
