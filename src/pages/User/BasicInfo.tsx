import { useState } from "react";
import type { User, Gender } from "../../types/user/user.types";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import CustomError from "../../components/Common/CustomError";
import { useUser } from "../../hooks/user/userUser";

type Props = {
  user: User;
};

const BasicInfo = ({ user }: Props) => {
  const { updateUser } = useUser();

  const initialForm = {
    name: user.name || "",
    gender: user.gender || "",
    location: user.location || "",
    birthday: user.birthday || "",
    summary: user.summary || "",
    website: user.website || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    twitter: user.twitter || "",
    work: user.work || "",
    education: user.education || "",
    skills: user.skills || [],
  };

  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState<keyof typeof form | null>(null);
  const [editingSkills, setEditingSkills] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GENDER_OPTIONS: Gender[] = ["male", "female", "other"];

  const handleSave = async (field: keyof typeof form) => {
    const value = form[field];

    if (field === "gender" && !GENDER_OPTIONS.includes(value as Gender)) {
      alert("Please select a valid gender.");
      return;
    }

    try {
      setError(null);
      await updateUser({ [field]: value });
      setIsEditing(false);
      setActiveField(null);
    } catch {
      setError("Failed to update. Please try again.");
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setIsEditing(false);
    setActiveField(null);
    setEditingSkills(false);
    setError(null);
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = e.currentTarget.value.trim();
      if (val && !form.skills.includes(val)) {
        setForm({ ...form, skills: [...form.skills, val] });
      }
      e.currentTarget.value = "";
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="space-y-6">
      {error && <CustomError message={error} />}

      {isEditing && activeField && (
        <div className="flex justify-end gap-2">
          <CustomButton onClick={() => handleSave(activeField)}>Save</CustomButton>
          <CustomButton
            onClick={handleCancel}
            className="bg-danger text-white hover:bg-red-600 dark:bg-danger dark:text-white hover:dark:bg-red-700"
          >
            Cancel
          </CustomButton>
        </div>
      )}

      <Section title="Basic Info">
        {renderField("Name", "name")}
        {renderField("Gender", "gender")}
        {renderField("Location", "location")}
        {renderField("Birthday", "birthday")}
        {renderField("Summary", "summary")}
      </Section>

      <Section title="Social Links">
        {renderField("Website", "website")}
        {renderField("Github", "github")}
        {renderField("LinkedIn", "linkedin")}
        {renderField("X (formerly Twitter)", "twitter")}
      </Section>

      <Section title="Experience">
        {renderField("Work", "work")}
        {renderField("Education", "education")}
      </Section>

      <Section title="Skills">
        {!editingSkills ? (
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-secondary text-white px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <button
              className="text-secondary hover:underline flex items-center gap-1 text-sm"
              onClick={() => setEditingSkills(true)}
            >
              <FaEdit size={14} />
              Edit
            </button>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-secondary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <IoMdClose size={12} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add skill and press Enter"
              onKeyDown={handleSkillAdd}
              className="border-2 border-dime dark:bg-primary dark:text-white dark:border-dark px-4 py-2 rounded-md w-full"
            />
            <div className="flex gap-2 mt-2">
              <CustomButton
                onClick={async () => {
                  try {
                    setError(null);
                    await updateUser({ skills: form.skills });
                    setEditingSkills(false);
                  } catch {
                    setError("Failed to update skills. Please try again.");
                  }
                }}
              >
                Save
              </CustomButton>
              <CustomButton
                onClick={handleCancel}
                className="bg-danger text-white hover:bg-red-600 dark:bg-danger dark:text-white hover:dark:bg-red-700"
              >
                Cancel
              </CustomButton>
            </div>
          </div>
        )}
      </Section>
    </div>
  );

  function renderField(label: string, key: keyof typeof form) {
    const isGender = key === "gender";
    const isBirthday = key === "birthday";

    return (
      <div className="flex justify-between items-start">
        <div className="w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          {isEditing && activeField === key ? (
            <>
              {isGender ? (
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value as Gender })
                  }
                  className="w-full border-2 border-dime dark:bg-primary dark:text-white dark:border-dark px-4 py-2 rounded-md"
                >
                  <option value="" disabled hidden>
                    Select Gender
                  </option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ) : isBirthday ? (
                <input
                  type="date"
                  value={form.birthday}
                  onChange={(e) =>
                    setForm({ ...form, birthday: e.target.value })
                  }
                  className="w-full border-2 border-dime dark:bg-primary dark:text-white dark:border-dark px-4 py-2 rounded-md"
                />
              ) : (
                <CustomInput
                  name={key}
                  label=""
                  value={form[key] as string}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="w-full"
                />
              )}
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-dark dark:text-white">
                {form[key] || `${label}`}
              </p>
              {!isEditing && (
                <button
                  className="text-secondary hover:underline flex items-center gap-1 text-sm"
                  onClick={() => {
                    setIsEditing(true);
                    setActiveField(key);
                  }}
                >
                  <FaEdit size={14} />
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-lg font-semibold text-primary dark:text-light mb-2">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export default BasicInfo;
