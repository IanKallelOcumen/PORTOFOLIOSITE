import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Code,
  Palette,
  Cpu,
  Wrench,
  Users,
  Server,
  Award,
  Calendar,
} from "lucide-react";

export function Resume() {
  // Using an absolute local file path so the iframe can load the CV on the same machine.
  const PDF_PATH = "D:/repo/PORTOFOLIOSITE/CV - Ian Kallel Ocumen.pdf";

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = PDF_PATH;
    a.download = "CV - Ian Kallel Ocumen.pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Resume PDF */}
      <div className="max-w-[210mm] mx-auto">
        <iframe
          src={PDF_PATH}
          title="Ian Kallel Ocumen Resume"
          className="w-full"
          style={{ height: "900px" }}
        />
      </div>

      {/* Optional fallback content if iframe can't render the PDF */}
      <div className="max-w-[210mm] mx-auto mt-6 text-center text-gray-700">
        <p className="text-sm">
          If the PDF doesn’t display in your browser, try opening it directly:
        </p>
        <a
          className="text-[#9333ea] underline underline-offset-2"
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
        >
          CV - Ian Kallel Ocumen.pdf
        </a>
      </div>

      {/* Keep a minimal styled header for consistent spacing */}
      <div className="max-w-[210mm] mx-auto mt-8 border-t pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Ian Kallel N. <span className="text-[#ccff00]">Ocumen</span>
            </h1>
            <p className="text-purple-600 font-medium mt-1">
              BS Information Technology Graduate | Multi-Disciplinary Creator
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mt-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#ccff00]" />
            <a className="hover:text-[#ccff00]" href="mailto:kallel.ocu@gmail.com">
              kallel.ocu@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#ccff00]" />
            <a
              className="hover:text-[#ccff00]"
              href="https://linkedin.com/in/ianocumen"
              target="_blank"
              rel="noopener noreferrer"
            >
              /ianocumen
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-[#ccff00]" />
            <a
              className="hover:text-[#ccff00]"
              href="https://github.com/IanKallelOcumen"
              target="_blank"
              rel="noopener noreferrer"
            >
              @IanKallelOcumen
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ccff00]" />
            <span>Binan, Laguna</span>
          </div>
        </div>
      </div>

      {/* Quick skills preview */}
      <div className="max-w-[210mm] mx-auto mt-6 grid grid-cols-2 gap-3">
        {["React", "TypeScript", "Unity", "C#", "Node.js", "Tailwind CSS"].map((s) => (
          <div
            key={s}
            className="border border-purple-200 bg-purple-50 text-purple-700 rounded-lg py-2 text-xs font-medium text-center"
          >
            {s}
          </div>
        ))}
      </div>

      {/* (Removed large HTML resume generator to keep this file valid & focused.) */}
      <div className="hidden">
        {/* Keep icon imports referenced to avoid unused-import issues in some configs */}
        <Code />
        <Palette />
        <Cpu />
        <Wrench />
        <Users />
        <Server />
        <Award />
        <Calendar />
      </div>
    </div>
  );
}

