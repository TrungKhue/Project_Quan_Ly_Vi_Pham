// =======================
// IMPORT FIREBASE
// =======================
import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// =======================
// HIỆU ỨNG CHUYỂN FORM
// =======================
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn?.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn?.addEventListener("click", () => {
    container.classList.remove("active");
});


// =======================
// ĐĂNG NHẬP
// =======================
const loginForm = document.getElementById("login-form");
const inpEmailLogin = document.querySelector("#email-login");
const inpPasswordLogin = document.querySelector("#password-login");

const handleLogin = async function (event) {
    event.preventDefault();

    let email = inpEmailLogin.value.trim();
    let password = inpPasswordLogin.value.trim();

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    try {
        // Login Firebase Auth
        const res = await signInWithEmailAndPassword(auth, email, password);
        const uid = res.user.uid;

        // Load role trong Firestore
        const userSnap = await getDoc(doc(db, "users", uid));
        if (!userSnap.exists()) {
            alert("Không tìm thấy hồ sơ người dùng!");
            return;
        }

        const role_id = userSnap.data().role_id;

        // Chuyển trang theo role
        if (role_id === 1) {
            window.location.href = "admin.html";
        } else if (role_id === 2) {
            window.location.href = "cododo.html"; // Cờ đỏ
        } else if (role_id === 3) {
            window.location.href = "student.html";
        } else {
            alert("Role không hợp lệ!");
        }

    } catch (err) {
        console.error(err);
        alert("Lỗi đăng nhập: " + err.message);
    }
};

loginForm?.addEventListener("submit", handleLogin);


// =======================
// ĐĂNG KÝ
// =======================
const registerForm = document.getElementById("register-form");

const handleRegister = async function (event) {
    event.preventDefault();

    let username = document.querySelector("#username").value.trim();
    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value.trim();

    // Mặc định role_id = 3 (thành viên)
    let role_id = 3;

    if (!username || !email || !password) {
        alert("Vui lòng nhập đầy đủ dữ liệu!");
        return;
    }

    try {
        // Tạo tài khoản Auth
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const uid = res.user.uid;

        // Lưu user vào Firestore
        await setDoc(doc(db, "users", uid), {
            username,
            email,
            role_id
        });

        alert("Đăng ký thành công!");
        container.classList.remove("active");

    } catch (err) {
        alert("Lỗi đăng ký: " + err.message);
        console.error(err);
    }
};

registerForm?.addEventListener("submit", handleRegister);
