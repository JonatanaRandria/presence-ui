import { useNavigate } from "react-router-dom";
import { InputField } from "@/components/Form/InputField";
import * as yup from "yup";
import { usePostEvent } from "../hooks/usePostEvent";
import { useAuth } from "@/features/auth"; // 💡 Importation du hook useAuth

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  start_datetime: yup.string().required("Start date is required"),
  end_datetime: yup
    .string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (end) {
        const start = this.parent.start_datetime;
        // La validation doit être ignorée si les dates sont absentes
        return !start || !end ? true : new Date(end) >= new Date(start);
      }
    ),
  location_name: yup.string().required("Location is required"),
  // Le champ createdBy doit être de type string (l'ID utilisateur)
  createdBy: yup.string().required("User ID is missing"),
});

export const AddEventPage = () => {
  const navigate = useNavigate();
  // 💡 CORRECTION : Récupérer userId de la source de vérité Redux via useAuth
  const { userId } = useAuth(); 

  // L'utilisateur doit être connecté pour accéder à cette page (géré par protectedRoutes),
  // mais une vérification supplémentaire est utile.
  if (!userId) {
    // Ceci ne devrait jamais arriver si protectedRoutes fonctionne
    return <p className="text-danger text-center mt-5">Error: User not authenticated.</p>;
  }
  
  // Utilisation de userId sans conversion ni suppression de guillemets
  const { register, handleSubmit, errors, isSubmitting } = usePostEvent({
    schema,
    defaultValues: {
      title: "",
      start_datetime: "",
      end_datetime: "",
      location_name: "",
      createdBy: userId, // ✅ Utilisation directe de l'ID utilisateur
    },
    onSuccess: () => {
      alert("Event created successfully!");
      // Assurez-vous que '/' est votre route principale après l'événement
      navigate("/event", { replace: true }); 
    },
  });

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="mb-4 text-center">Create Event</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputField
              label="Event Title"
              placeholder="Ex: Cybersecurity Conference"
              {...register("title")}
              invalidFeedback={errors.title?.message}
            />
          </div>

          <div className="mb-3">
            <InputField
              type="datetime-local"
              label="Start Date"
              {...register("start_datetime")}
              invalidFeedback={errors.start_datetime?.message}
            />
          </div>

          <div className="mb-3">
            <InputField
              type="datetime-local"
              label="End Date"
              {...register("end_datetime")}
              invalidFeedback={errors.end_datetime?.message}
            />
          </div>

          <div className="mb-3">
            <InputField
              label="Location"
              placeholder="Ex: Hall A"
              {...register("location_name")}
              invalidFeedback={errors.location_name?.message}
            />
          </div>

          {/* Hidden field for createdBy - Pas besoin de valeur ici, car elle est dans defaultValues */}
          <input type="hidden" {...register("createdBy")} /> 

          <button className="btn btn-primary w-100 mt-3" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Event"}
          </button>

          {errors?.root?.serverError && (
            <p className="text-danger mt-3">{errors.root.serverError.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};