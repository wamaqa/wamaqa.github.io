import {
  Color,
  Matrix3,
  Vector2,
  Vector3
} from "./chunk-Y2MWCU52.js";

// node_modules/three/examples/jsm/exporters/OBJExporter.js
var OBJExporter = class {
  parse(object) {
    let output = "";
    let indexVertex = 0;
    let indexVertexUvs = 0;
    let indexNormals = 0;
    const vertex = new Vector3();
    const color = new Color();
    const normal = new Vector3();
    const uv = new Vector2();
    const face = [];
    function parseMesh(mesh) {
      let nbVertex = 0;
      let nbNormals = 0;
      let nbVertexUvs = 0;
      const geometry = mesh.geometry;
      const normalMatrixWorld = new Matrix3();
      const vertices = geometry.getAttribute("position");
      const normals = geometry.getAttribute("normal");
      const uvs = geometry.getAttribute("uv");
      const indices = geometry.getIndex();
      output += "o " + mesh.name + "\n";
      if (mesh.material && mesh.material.name) {
        output += "usemtl " + mesh.material.name + "\n";
      }
      if (vertices !== void 0) {
        for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
          vertex.fromBufferAttribute(vertices, i);
          vertex.applyMatrix4(mesh.matrixWorld);
          output += "v " + vertex.x + " " + vertex.y + " " + vertex.z + "\n";
        }
      }
      if (uvs !== void 0) {
        for (let i = 0, l = uvs.count; i < l; i++, nbVertexUvs++) {
          uv.fromBufferAttribute(uvs, i);
          output += "vt " + uv.x + " " + uv.y + "\n";
        }
      }
      if (normals !== void 0) {
        normalMatrixWorld.getNormalMatrix(mesh.matrixWorld);
        for (let i = 0, l = normals.count; i < l; i++, nbNormals++) {
          normal.fromBufferAttribute(normals, i);
          normal.applyMatrix3(normalMatrixWorld).normalize();
          output += "vn " + normal.x + " " + normal.y + " " + normal.z + "\n";
        }
      }
      if (indices !== null) {
        for (let i = 0, l = indices.count; i < l; i += 3) {
          for (let m = 0; m < 3; m++) {
            const j = indices.getX(i + m) + 1;
            face[m] = indexVertex + j + (normals || uvs ? "/" + (uvs ? indexVertexUvs + j : "") + (normals ? "/" + (indexNormals + j) : "") : "");
          }
          output += "f " + face.join(" ") + "\n";
        }
      } else {
        for (let i = 0, l = vertices.count; i < l; i += 3) {
          for (let m = 0; m < 3; m++) {
            const j = i + m + 1;
            face[m] = indexVertex + j + (normals || uvs ? "/" + (uvs ? indexVertexUvs + j : "") + (normals ? "/" + (indexNormals + j) : "") : "");
          }
          output += "f " + face.join(" ") + "\n";
        }
      }
      indexVertex += nbVertex;
      indexVertexUvs += nbVertexUvs;
      indexNormals += nbNormals;
    }
    function parseLine(line) {
      let nbVertex = 0;
      const geometry = line.geometry;
      const type = line.type;
      const vertices = geometry.getAttribute("position");
      output += "o " + line.name + "\n";
      if (vertices !== void 0) {
        for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
          vertex.fromBufferAttribute(vertices, i);
          vertex.applyMatrix4(line.matrixWorld);
          output += "v " + vertex.x + " " + vertex.y + " " + vertex.z + "\n";
        }
      }
      if (type === "Line") {
        output += "l ";
        for (let j = 1, l = vertices.count; j <= l; j++) {
          output += indexVertex + j + " ";
        }
        output += "\n";
      }
      if (type === "LineSegments") {
        for (let j = 1, k = j + 1, l = vertices.count; j < l; j += 2, k = j + 1) {
          output += "l " + (indexVertex + j) + " " + (indexVertex + k) + "\n";
        }
      }
      indexVertex += nbVertex;
    }
    function parsePoints(points) {
      let nbVertex = 0;
      const geometry = points.geometry;
      const vertices = geometry.getAttribute("position");
      const colors = geometry.getAttribute("color");
      output += "o " + points.name + "\n";
      if (vertices !== void 0) {
        for (let i = 0, l = vertices.count; i < l; i++, nbVertex++) {
          vertex.fromBufferAttribute(vertices, i);
          vertex.applyMatrix4(points.matrixWorld);
          output += "v " + vertex.x + " " + vertex.y + " " + vertex.z;
          if (colors !== void 0) {
            color.fromBufferAttribute(colors, i).convertLinearToSRGB();
            output += " " + color.r + " " + color.g + " " + color.b;
          }
          output += "\n";
        }
        output += "p ";
        for (let j = 1, l = vertices.count; j <= l; j++) {
          output += indexVertex + j + " ";
        }
        output += "\n";
      }
      indexVertex += nbVertex;
    }
    object.traverse(function(child) {
      if (child.isMesh === true) {
        parseMesh(child);
      }
      if (child.isLine === true) {
        parseLine(child);
      }
      if (child.isPoints === true) {
        parsePoints(child);
      }
    });
    return output;
  }
};
export {
  OBJExporter
};
//# sourceMappingURL=three_addons_exporters_OBJExporter__js.js.map
