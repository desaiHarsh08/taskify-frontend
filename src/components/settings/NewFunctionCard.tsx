import Button from "../ui/Button";

export default function NewFunctionCard() {
  return (
    <div className="h-100 w-100">
      <div className="mb-3">
        <label htmlFor="functionPrototypeTitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="functionPrototypeTitle"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="functionPrototypeTitle" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="functionPrototypeTitle" className="form-label">
          Description
        </label>
        <select className="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="my-4">
        <div className="d-flex gap-2 pb-2 border-bottom align-items-center">
          <p>Add Fields</p>
          <Button type="button">+</Button>
        </div>
        <div className="d-flex gap-3 px-3 my-3 w-100 pb-5">
          <div className="card w-100">
            <p className="card-header">Field 1</p>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="fieldTitle" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control" id="fieldTitle" />
              </div>
              <div className="mb-3">
                <label htmlFor="fieldTitle" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <div className="d-flex gap-2 pb-2 border-bottom align-items-center">
                  <p>Add Columns</p>
                  <Button type="button">+</Button>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <th className="w-25 border text-center">Name</th>
                    <th className="w-25 border text-center">Type</th>
                    <th className="w-25 border text-center">Large Text</th>
                    <th className="w-25 border text-center">Multiple Files</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-25">
                        <input type="text" className="form-control" />
                      </td>
                      <td className="w-25">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </td>
                      <td className="w-25">
                        <p className="d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </p>
                      </td>
                      <td className="w-25">
                        <p className="d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
