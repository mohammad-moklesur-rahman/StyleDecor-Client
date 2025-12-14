import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { UploadImageToImgbb } from "../../utils/imgbb/UploadImageToImgbb";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Add this service?",
      text: "This decoration service will be added.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Upload image to imgbb
          const imageFile = data.image[0];
          const imageURL = await UploadImageToImgbb(imageFile);

          const finalData = {
            service_name: data.service_name,
            image: imageURL,
            service_category: data.service_category,
            cost: Number(data.cost),
            unit: data.unit,
            date: data.date,
            description: data.description,
            createdByEmail: user?.email,
          };

          // POST to backend
          await axiosSecure.post("/services", finalData);

          Swal.fire("Success!", "Service added successfully!", "success");
          reset();
        } catch {
          Swal.fire("Error!", "Failed to add service.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-accent-content pb-20">
      <h2 className="text-center text-2xl text-green-500 font-bold py-8">
        Add Decoration Service
      </h2>

      <div className="max-w-2xl mx-auto bg-primary-content p-8 rounded-2xl shadow-md">
        <h2 className="text-[20px] text-accent font-semibold text-center mb-4">
          New Service
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Service Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Name</span>
            </label>
            <input
              {...register("service_name", {
                required: "Service name is required",
              })}
              placeholder="Fairy Light Engagement Setup"
              className="input outline-primary w-full"
            />
            {errors.service_name && (
              <p className="text-red-500">{errors.service_name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("service_category", { required: true })}
              className="select outline-primary border-0 w-full"
            >
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Party">Party</option>
              <option value="Celebration">Celebration</option>
            </select>
          </div>

          {/* Cost */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cost (BDT)</span>
            </label>
            <input
              type="number"
              {...register("cost", { required: "Cost is required" })}
              placeholder="420"
              className="input outline-primary w-full"
            />
            {errors.cost && (
              <p className="text-red-500">{errors.cost.message}</p>
            )}
          </div>

          {/* Unit */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Unit</span>
            </label>
            <select
              {...register("unit", { required: true })}
              className="select outline-primary border-0 w-full"
            >
              <option value="per event">Per Event</option>
              <option value="per floor">Per Floor</option>
              <option value="per meter">Per Meter</option>
              <option value="per square-ft">Per Square-ft</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="input outline-primary w-full"
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Write service description..."
              className="textarea outline-primary w-full"
              rows="3"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Created By Email</span>
            </label>
            <input
              value={user?.email || "Loading..."}
              readOnly
              className="input bg-gray-200 cursor-not-allowed w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-secondary text-green-500 w-full"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
