"""
services/auth_service.py — בדיקת משתמשים
"""
from werkzeug.security import check_password_hash

from server.repositories.student_repository import StudentRepository


def validate_user(db, username: str, password: str):
    try:
        student_id = int(username)
    except ValueError:
        return None

    repo = StudentRepository(db)
    student = repo.get_by_id(student_id)

    if not student:
        return None

    if not student.is_active:
        return None

    if not check_password_hash(student.password_hash, password):
        return None

    return {
        "id": student.id,
        "role": "student",
        "username": student.first_name
    }