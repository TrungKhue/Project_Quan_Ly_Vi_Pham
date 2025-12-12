import { auth, db } from "../clien/js/firebase-config.js";
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
// HIỆU ỨNG FORM
// =======================
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// =======================
// ĐĂNG NHẬP (LOGIN)
// =======================
export async function loginUser() {
  const email = document.getElementById("login_email").value;
  const pw = document.getElementById("login_password").value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, pw);
    const uid = res.user.uid;

    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) {
      alert("Không có hồ sơ người dùng!");
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "admin.html";
    } else if (role === "coderdo") {
      window.location.href = "cododo.html";
    } else if (role === "member") {
      window.location.href = "student.html";
    } else {
      alert("Role không hợp lệ!");
    }

  } catch (err) {
    console.error(err);
    alert("Email hoặc mật khẩu sai!");
  }
}

// =======================
// ĐĂNG KÝ (OPTIONAL)
// =======================
export async function registerUser() {
  const email = document.getElementById("reg_email").value;
  const pw = document.getElementById("reg_password").value;
  const fullname = document.getElementById("reg_name").value;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, pw);
    const uid = res.user.uid;

    await setDoc(doc(db, "users", uid), {
      name: fullname,
      email: email,
      role: "member"   // mặc định là thành viên
    });

    alert("Đăng ký thành công! Bạn có thể đăng nhập.");
    container.classList.remove("active");

  } catch (err) {
    console.error(err);
    alert("Lỗi đăng ký!");
  }
}
