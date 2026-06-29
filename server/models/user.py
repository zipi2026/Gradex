from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from server.models.base import Base


class User(Base):
    """טבלת בסיס לוגית בלבד (לא נוצרת ישירות)."""

    __tablename__ = "Users"

    # =========================
    # PK (shared id)
    # =========================
    id = Column("UserID", Integer, primary_key=True, autoincrement=False)

    # =========================
    # FIELDS
    # =========================
    role = Column("Role", String(10), nullable=False)  # student | teacher

    first_name = Column("FirstName", String(100), nullable=False)
    last_name = Column("LastName", String(100), nullable=False)

    # =========================
    # RELATIONSHIPS
    # =========================
    student = relationship(
        "Student",
        back_populates="user",
        uselist=False
    )

    teacher = relationship(
        "Teacher",
        back_populates="user",
        uselist=False
    )

    def __repr__(self):
        return f"<User id={self.id} role={self.role}>"